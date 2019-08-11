from flask import Flask, request, render_template, redirect, url_for, jsonify, flash
import os
import json
import pyrebase
import urllib.parse as urlparse
from datetime import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


cred = credentials.Certificate('./firebase.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

app = Flask(__name__)

accNum = "000"

def query(nameOfCompany, accNum):
    doc_ref = db.collection(nameOfCompany).document(accNum)
    try:
        doc = doc_ref.get()
        data = doc.to_dict()
        print(data)
        return data
    except google.cloud.exceptions.NotFound:
        print(u'No such document!')
        return None

def update_field(doc_ref, field, value):
    doc_ref.update({
        field : value
    })

@firestore.transactional
def update_in_transaction(nameOfCompany, accNum):
    transaction = db.transaction()
    doc_ref = db.collection(nameOfCompany).document(accNum)
    try:
        doc = doc_ref.get()
        data = doc.to_dict()
        coffeeCount = data['coffeecount']
        update_field(doc_ref, 'coffeecount', coffeeCount + 1)
    except google.cloud.exceptions.NotFound:
        data = {
            u'coffeecount': 1,
            u'expiration': time.time()
        }

        # Add a new doc in collection 'cities' with ID 'LA'
        db.collection(u'cities').document(u'LA').set(data)

    snapshot = doc_ref.get(transaction=transaction)
    transaction.update(doc_ref, {
        u'coffeecount': snapshot.get(u'coffeecount') + 1
    })

@app.route("/")
def dashboard():
    return render_template('Home.html')

@app.route("/woolworths")
def woolworths():
    name = "woolworths"
    data = query(name, accNum)
    return render_template('woolworths.html', newdata=data)

@app.route("/dintaifung")
def dintaifung():
    name = "dintaifung"
    data = query(name, accNum)
    return render_template('dintaifung.html', newdata=data)

@app.route("/frankiesbeans")
def fredscoffee():
    name = "frankiesbeans"
    data = query(name, accNum)
    return render_template('frankiesbeans.html', newdata=data)

@app.route("/business")
def business():
    name = "frankiesbeans"
    data = query(name, accNum)
    return render_template('business.html', newdata=data)

@app.route("/backend/", methods=['GET', 'POST'])
def backend():
    if request.method == 'POST':
        accNum = request.form['accNum']
        nameOfCompany='frankiesbeans'
        update_in_transaction(nameOfCompany, accNum)
        
        return redirect(url_for('backend'))
    return render_template('backend.html', database=wards)


if __name__ == "__main__":
    app.run()
