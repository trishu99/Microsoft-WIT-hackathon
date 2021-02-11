from flask import Flask, request, send_file, send_from_directory, safe_join, abort

app = Flask(__name__)

@app.route('/getFile', methods=['GET'])
def getFileFun(): 
	try:
		return send_from_directory(request.json['path'], filename = request.json['filename'], as_attachment=True)
	except FileNotFoundError:
		abort(404)

if __name__ == "__main__":
    app.run(debug = True)