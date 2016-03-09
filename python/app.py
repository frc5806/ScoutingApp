import os

from flask import Flask, redirect, url_for, request, render_template
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient()
db = client.ScoutingApp

@app.route('/api/forms', methods=['GET', 'POST'])
def team():
	if request.method == 'GET':
		return str([item for item in db.team.find()])
	else:
		db.team.insert(request.form['forms'])

if __name__ == "__main__":
	app.run(host='0.0.0.0', debug=True)