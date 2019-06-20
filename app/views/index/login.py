from flask import Blueprint, jsonify, request
from flask_login import login_user
from data.user import User
from db.handler.user_handler import get_login_user
from message import response
from message.config import code
from home import conn, login_manager

login_app = Blueprint('login', __name__)


@login_app.route("/api/login", methods=["POST"])
def login():
    user_id = request.json['user_id']
    user_pw = request.json['user_pw']

    user = get_login_user(conn, user_id, user_pw)

    if not user:
        return jsonify(
            response.build(code_num=code.NOT_VALID_USER,
                           code_message=code.NOT_VALID_USER_MSG)
        ), 200

    else:
        user.is_authenticated = True
        login_user(user, remember=True)
        return jsonify(
            response.build(code_num=code.SUCCESS,
                           code_message=response.success_to_login(user.name))
        ), 200