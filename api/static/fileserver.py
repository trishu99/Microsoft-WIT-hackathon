from flask import Flask, send_file, send_from_directory, safe_join, abort

app = Flask(__name__)

# app.config["CLIENT_IMAGES"] = "/home/mahima/console/static/client/img"
app.config["CLIENT_IMAGES"] = "/home/lenovo/SEproject/OpsConsole/api/static"


# The absolute path of the directory containing CSV files for users to download
app.config["CLIENT_CSV"] = "/home/mahima/console/static/client/csv"

# The absolute path of the directory containing PDF files for users to download
app.config["CLIENT_PDF"] = "/home/mahima/console/static/client/pdf"

@app.route("/getimg/<img_name>")
def get_img(img_name):
    try:
        return send_from_directory(app.config["CLIENT_IMAGES"], filename = img_name, as_attachment=True)
    except FileNotFoundError:
        abort(404)

@app.route('/hello')
def hello():
    return "Hello Lifeeee"

if __name__ == "__main__":
    app.run(debug = True)