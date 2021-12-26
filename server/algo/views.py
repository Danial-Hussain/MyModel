from django.http.response import HttpResponse, JsonResponse, HttpResponseBadRequest
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.tree import DecisionTreeRegressor, DecisionTreeClassifier
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.core import serializers
from .models import MachineLearningModel
from urllib.parse import unquote
import statsmodels.api as sm
import sklearn as sk
import json
from .utils import (
    authorize, 
    parseToken, 
    parseCsv, 
    parseVariables, 
    compute_cm_scores, 
    regression_metrics
)


@csrf_exempt
def getModels(request, username):
    token = parseToken(request)
    decoded_username = authorize(token)
    if username != None and username == decoded_username:
        try:
            models = MachineLearningModel.objects.filter(username=username)
            serialized_models = serializers.serialize("json", models)
        except (KeyError, MachineLearningModel.DoesNotExist):
            return HttpResponseBadRequest("No Models")
        else:
            return HttpResponse(
                serialized_models, content_type="text/json-comment-filtered"
            )
    else:
        return HttpResponseBadRequest("Option Unavailable")


@csrf_exempt
def buildModel(request, username):
    token = parseToken(request)
    decoded_username = authorize(token)
    if username != None and username == decoded_username:
        decode = lambda data: data.decode("utf-8")
        body = json.loads(decode(request.body))
        model_type = body["model-type"]
        model_data = parseCsv(unquote(unquote(body["model-data"])))
        model_pred = body["model-pred"]
        model_resp = body["model-resp"]
        X, Y = parseVariables(model_data, model_resp, model_pred)
        # OLS
        if model_type == "Ordinary Least Squares Regression":
            try:
                model = sm.OLS(Y, X)
                results = model.fit()
                metrics = {
                    "aic": results.aic,
                    "bic": results.bic,
                    "mse": results.mse_total,
                    "rsquared": results.rsquared,
                    "rsquared_adj": results.rsquared_adj,
                }
            except:
                return HttpResponseBadRequest("Unable to create model")
        # Robust Linear Regression
        elif model_type == "Robust Linear Regression":
            try:
                model = sm.RLM(Y, X, M=sm.robust.norms.HuberT()).fit()
                mae, mse, r2 = regression_metrics(Y, model.predict(X))
                metrics = {
                    "mae": mae,
                    "mse": mse,
                    "rsquared": r2,
                }
            except:
                return HttpResponseBadRequest("Unable to create model")
        # Logistic Regression                
        elif model_type == "Logistic Regression":
            try:
                model = sm.Logit(Y, X)
                results = model.fit()
                recall, precision, accuracy, f_measure = compute_cm_scores(
                    Y, model.predict(X)
                )
                metrics = {
                    "aic": results.aic,
                    "bic": results.bic,
                    "pseudo-rsquared": results.prsquared,
                    "recall": recall,
                    "precision": precision,
                    "accuracy": accuracy,
                    "f_measure": f_measure,
                }
            except:
                return HttpResponseBadRequest("Unable to create model")
        # Ridge Regression
        elif model_type == "Ridge Regression":
            try:
                model = sk.linear_model.Ridge(alpha=1)
                model.fit(X,Y)
                mae, mse, r2 = regression_metrics(Y, model.predict(X))
                metrics = {
                    "mae": mae,
                    "mse": mse,
                    "rsquared": r2,
                }
            except:
                return HttpResponseBadRequest("Unable to create model")
        # Lasso Regression
        elif model_type == "Lasso Regression":
            try:
                model = sk.linear_model.Lasso(alpha=1)
                model.fit(X,Y)
                mae, mse, r2 = regression_metrics(Y, model.predict(X))
                metrics = {
                    "mae": mae,
                    "mse": mse,
                    "rsquared": r2,
                }
            except:
                return HttpResponseBadRequest("Unable to create model")
        # Elastic Net Regression
        elif model_type == "Elastic Net":
            try:
                model = sk.linear_model.ElasticNet(alpha=1)
                model.fit(X,Y)
                mae, mse, r2 = regression_metrics(Y, model.predict(X))
                metrics = {
                    "mae": mae,
                    "mse": mse,
                    "rsquared": r2,
                }
            except:
                return HttpResponseBadRequest("Unable to create model")
        # Ridge Classification
        elif model_type == "Ridge Classifier":
            try:
                model = sk.linear_model.RidgeClassifier(alpha=1)
                model.fit(X,Y)
                recall, precision, accuracy, f_measure = compute_cm_scores(
                    Y, model.predict(X)
                )
                metrics = {
                    "recall": recall,
                    "precision": precision,
                    "accuracy": accuracy,
                    "f_measure": f_measure,
                }
            except:
                return HttpResponseBadRequest("Unable to create model")
        # Decision Tree
        elif model_type == "Decision Tree Regression":
            try:
                model = DecisionTreeRegressor()
                model.fit(X,Y)
                mae, mse, r2 = regression_metrics(Y, model.predict(X))
                metrics = {
                    "mae": mae,
                    "mse": mse,
                    "rsquared": r2,
                }
            except:
                return HttpResponseBadRequest("Unable to create model")
        # Random Forest Regressor
        elif model_type == "Random Forrest Regressor":
            try:
                model = RandomForestRegressor()
                model.fit(X,Y)
                mae, mse, r2 = regression_metrics(Y, model.predict(X))
                metrics = {
                    "mae": mae,
                    "mse": mse,
                    "rsquared": r2,
                }
            except:
                return HttpResponseBadRequest("Unable to create model")
        # Decision Tree
        elif model_type == "Decision Tree Classifier":
            try:
                model = DecisionTreeClassifier()
                model.fit(X,Y)
                recall, precision, accuracy, f_measure = compute_cm_scores(
                    Y, model.predict(X)
                )
                metrics = {
                    "recall": recall,
                    "precision": precision,
                    "accuracy": accuracy,
                    "f_measure": f_measure,
                }
            except:
                return HttpResponseBadRequest("Unable to create model")
        # Random Forest
        elif model_type == "Random Forest Classifier":
            try:
                model = RandomForestClassifier()
                model.fit(X,Y)
                recall, precision, accuracy, f_measure = compute_cm_scores(
                    Y, model.predict(X)
                )
                metrics = {
                    "recall": recall,
                    "precision": precision,
                    "accuracy": accuracy,
                    "f_measure": f_measure,
                }
            except:
                return HttpResponseBadRequest("Unable to create model")
        else:
            return HttpResponseBadRequest("Invalid Model Type")
        return JsonResponse({"metrics": metrics})
    else:
        return HttpResponseBadRequest("Option Unavailable")


@csrf_exempt
def saveModel(request, username):
    token = parseToken(request)
    decoded_username = authorize(token)
    if username != None and username == decoded_username:
        try:
            decode = lambda data: data.decode("utf-8")
            body = json.loads(decode(request.body))
            model_name = body["model-name"]
            model_fold = body["model-fold"]
            model_type = body["model-type"]
            model_pred = body["model-pred"]
            model_resp = body["model-resp"]
            model_metric = body["model-metric"]
            if MachineLearningModel.objects.filter(model_name=model_name).exists():
                raise Exception("Model with this name already exists")
        except:
            return HttpResponseBadRequest("Unable to save model")
        else:
            model = MachineLearningModel(
                username=username,
                model_name=model_name,
                folder_name=model_fold,
                model_type=model_type,
                predictors=[{"feature_name": pred["value"]} for pred in model_pred],
                response={"feature_name": model_resp["value"]},
                metrics=[
                    {"metric_name": metric["name"], "metric_value": metric["value"]}
                    for metric in model_metric
                ],
            )
            model.save()
            return HttpResponse("Model saved")