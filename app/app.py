from flask import Flask, render_template, jsonify, request
from message import response
from message.config import code
from db.handler.handler_user import add_user, modify_user, delete_user
from db.handler.handler_todo import add_todo, modify_todo, delete_todo

app = Flask('__name__')


@app.route("/", methods=["GET"])
def home():
    return render_template("index.html"), 200


@app.route("/user/add", methods=["POST"])
def post_add_user():
    req = request.get_json()

    try:
        add_user(req)
        return jsonify(
            response.build(code_num=code.SUCCESS,
                            code_message=code.SUCCESS_ADD_USER)
        ), 200

    except:
        return jsonify(
            response.build(code_num=code.FAIL,
                           code_message=code.FAIL_ADD_USER)
        ), 500


@app.route("/user/modify", methods=["POST"])
def update_modify_user():
    req = request.get_json()

    try:
        modify_user(req)
        return jsonify(
            response.build(code_num=code.SUCCESS,
                           code_message=code.SUCCESS_MODIFY_USER)
        ), 200

    except:
        return jsonify(
            response.build(code_num=code.FAIL,
                           code_message=code.FAIL_MODIFY_USER)
        ), 500


@app.route("/user/delete", methods=["DELETE"])
def delete_user_id():
    id = request.args.get("id")

    try:
        delete_user(id)
        return jsonify(
            response.build(code_num=code.SUCCESS,
                           code_message=code.SUCCESS_DELETE_USER)
        ), 200

    except:
        return jsonify(
            response.build(code_num=code.FAIL,
                           code_message=code.FAIL_DELETE_USER)
        ), 500


@app.route("/todo/add", methods=["POST"])
def post_add_todo():
    req = request.get_json()

    try:
        add_todo(req)
        return jsonify(
            response.build(code_num=code.SUCCESS,
                           code_message=code.SUCCESS_ADD_TODO)
        ), 200
    except:
        return jsonify(
            response.build(code_num=code.FAIL,
                           code_message=code.FAIL_ADD_TODO)
        ), 500


@app.route("/todo/modify", methods=["POST"])
def post_modify_todo():
    req = request.get_json()

    try:
        modify_todo(req)
        return jsonify(
            response.build(code_num=code.SUCCESS,
                           code_message=code.SUCCESS_MODIFY_TODO)
        ), 200
    except:
        return jsonify(
            response.build(code_num=code.FAIL,
                           code_message=code.FAIL_MODIFY_TODO)
        ), 500


@app.route("/todo/delete", methods=["DELETE"])
def delete_todo_no():
    no = request.args.get("no")

    try:
        delete_todo(no)
        return jsonify(
            response.build(code_num=code.SUCCESS,
                           code_message=code.SUCCESS_DELETE_TODO)
        ), 200
    except:
        return jsonify(
            response.build(code_num=code.FAIL,
                           code_message=code.FAIL_DELETE_TODO)
        ), 500


if __name__ == '__main__':
    app.run('0.0.0.0', 8000, debug=True)