from flask import Flask, redirect, url_for, request, render_template
from flask.ext.cors import CORS
from pymongo import MongoClient
import json

app = Flask(__name__)
CORS(app)

client = MongoClient()
db = client.ScoutingApp

@app.route('/api/forms', methods=['GET', 'POST'])
def team():
	print()
	if request.method == 'GET':
		return str([item for item in db.team.find()])
	else:
		for form in request.get_json()['forms']:
			if 'teamNumber' in form and 'teamName' in form and db.team.find_one({teamnumber: form['teamNumber']}) == None:
				db.team.insert(form)
		return "Sucess"

if __name__ == "__main__":
	app.run(host='0.0.0.0', debug=True)