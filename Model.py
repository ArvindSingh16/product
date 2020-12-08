# -*- coding: utf-8 -*-
"""
Created on Tue Dec  1 20:41:22 2020

@author: Arvind
"""

import os
import pandas as pd
trainData = pd.read_csv("train.tsv",'\t')
testData = pd.read_csv("test.tsv",'\t')
trainData.sample(frac=1).head(5)
from sklearn.feature_extraction.text import TfidfVectorizer
# Create feature vectors
vectorizer = TfidfVectorizer(min_df = 5,
                             max_df = 0.8,
                             sublinear_tf = True,
                             use_idf = True)
train_vectors = vectorizer.fit_transform(trainData['Phrase'])
test_vectors = vectorizer.transform(testData['Phrase'])
import time
from sklearn import svm
from sklearn.metrics import classification_report
# Perform classification with SVM, kernel=linear
classifier_linear = svm.SVC(kernel='linear')
t0 = time.time()
classifier_linear.fit(train_vectors, trainData['Sentiment'])
t1 = time.time()
prediction_linear = classifier_linear.predict(test_vectors)
t2 = time.time()
time_linear_train = t1-t0
time_linear_predict = t2-t1
# results
print("Training time: %fs; Prediction time: %fs" % (time_linear_train, time_linear_predict))
import pickle
pickle.dump(vectorizer, open('vectorizer.pkl', 'wb'))
pickle.dump(classifier_linear, open('classifier.pkl', 'wb'))