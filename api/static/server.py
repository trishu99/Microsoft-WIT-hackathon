from flask import Flask, request, make_response, jsonify
import shell, listAll 
from flask_cors import CORS


app = Flask(__name__) 
CORS(app)

@app.route('/shell', methods=['POST'])
def shellFun(): 
	return jsonify(shell.runCommand(request.json['command']))

@app.route('/listAll', methods=['POST'])
def listAllFun(): 
	return jsonify(listAll.directoryContents(request.json['path']))

if __name__ == '__main__': 
	app.run(debug = True) 
