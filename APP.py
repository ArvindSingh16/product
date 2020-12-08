# -*- coding: utf-8 -*-
"""
Created on Wed Dec  2 00:11:36 2020

@author: Arvind
"""

from flask import Flask, render_template, request
from wtforms import Form, TextAreaField, validators
import pickle
import sqlite3
import os
import pandas as pd
import numpy as np
import joblib
loaded_model=joblib.load('classifier.pkl', 'rb')
loaded_vec=joblib.load('vectorizer.pkl', 'rb')
app = Flask(__name__, template_folder='templates')
def classify(document):
    label = {0: 'bad', 1: 'negative', 2: 'neutral', 3: 'positive', 4: 'Great'}
    X = loaded_vec.transform([document])
    y = (loaded_model.predict(X)[0])
    return label[y]
def train(document, y):
	X = loaded_vec.transform([document])
	loaded_model.partial_fit(X, [y])
class ReviewForm(Form):
    productreview = TextAreaField('',
			[validators.DataRequired(), validators.length(min=15)])
@app.route('/', endpoint='func1')

def index():
    form = ReviewForm(request.form)
    return render_template('reviewform.html', form=form)
@app.route('/results', methods=['POST'], endpoint='func2')

def results():
    form = ReviewForm(request.form)
    review = request.form['productreview']
    
    if request.method == 'POST' and form.validate():
        
        return render_template('results.html',content=review,prediction=classify(review))

    return render_template('reviewform.html', form=form)
@app.route('/thanks', methods=['POST'])
def feedback():
	feedback = request.form['feedback_button']
	review = request.form['productreview']
	prediction = request.form['prediction']
	inv_label = {0: 'bad', 1: 'negative', 2: 'neutral', 3: 'positive', 4: 'Great'}
	y = inv_label[prediction]
	if feedback == 'Incorrect':
		y = int(not(y))
	train(review, y) 
	return render_template('thanks.html')
if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
