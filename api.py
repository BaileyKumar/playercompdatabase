from flask import Flask, jsonify, request
from manage import *
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__, static_folder="front_end/build", static_url_path='/')


CORS(app)

@app.route('/')
@cross_origin()
def index():
    return app.send_static_file('index.html')

@app.route('/api/request', methods=['POST'])
@cross_origin()
def request_data():
    # return '', 204
    data = get_names(request.get_json())
    if data:
        return data,200
    else:
        return '404',404
@app.route('/api/getData', methods=['POST'])
@cross_origin()
def retrieve_player_data():
    # return '', 204
    data = get_all_player_data(request.get_json())
    if data:
        return data,200
    else:
        return '404',404

if __name__ == "__main__":
    app.run()
