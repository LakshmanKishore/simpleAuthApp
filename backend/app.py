from flask import Flask, request, jsonify, make_response, request, render_template, session, flash
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

# Since this is for demo, I have kept secret key simple, but when used for real application keep a strong key"
# Use Environment Variables to access and store the key.
app.config["JWT_SECRET_KEY"] = "super-secret-key-1234"
jwt = JWTManager(app)

@app.route("/")
def home():
    return "Home Page"

@app.route("/login", methods=["POST"])
def login():
    # print(request.get_json())
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    print(username,password)

    user = {"username":username,"password":password}
    # We can assume these are the users that are present in the Database for temporary.
    dbUsers = [["test","test"],["lakshman","password"],["testing","testing"]]

    # Verify whether the username and password are matching with the details in database.
    for i,j in dbUsers:
        if i == user["username"] and j == user["password"]:
            # create a new token with the user name as identity
            access_token = create_access_token(identity=user["username"])
            return jsonify({ "token": access_token, "username": user["username"] })
    else:
        return jsonify({"msg": "Bad username or password"}), 401


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    # print(current_user)
    # Below Dictionary can be replaced with the data fetched from database.
    user = {"id":10,"username":current_user}
    
    return jsonify({"id": user["id"], "username": user["username"]}), 200

if __name__ == "__main__":
    app.run(debug=True)
