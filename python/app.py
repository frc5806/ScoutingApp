from flask import Flask, redirect, url_for, request, render_template
from flask.ext.cors import CORS
from pymongo import MongoClient
import json
from bson.json_util import dumps

app = Flask(__name__)
CORS(app)

client = MongoClient()
db = client.ScoutingApp

@app.route('/api/forms', methods=['GET', 'POST'])
def team():
	print()
	if request.method == 'GET':
		return dumps([item for item in db.team.find()])
	else:
		print(request.get_json()['forms'])
		for form in request.get_json()['forms']:
			if 'teamnumber' in form and 'teamname' in form and db.team.find_one({'teamnumber': form['teamnumber']}) == None:
				db.team.insert(form)
			else
				db.team.replaceOne({'teamnumber': form['teamnumber']} , form)
		return "Sucess"

if __name__ == "__main__":
	app.run(host='0.0.0.0', debug=True)
