from typing import Union
from django.core import exceptions
import statsmodels.api as sm
from io import StringIO
import sklearn as sk
import numpy as np
import pandas as pd
import typing
import jwt
import os


def authorize(token: str) -> typing.Union[str, None]:
    """
    Authorize jwt token
    """
    try:
        decoded = jwt.decode(
            jwt=token, key=os.environ.get("JWT_KEY"), algorithms="HS256"
        )
    except (KeyError, jwt.exceptions.InvalidSignatureError):
        return None
    else:
        return decoded["username"]


def parseCsv(csv: str) -> pd.DataFrame:
    """
    Parse csv string to dataframe
    """
    data = StringIO(csv)
    df = pd.read_csv(data, sep=",")
    return df


def parseVariables(
    model_data: pd.DataFrame, model_resp: pd.DataFrame, model_pred: pd.DataFrame
) -> typing.Tuple[pd.DataFrame, pd.DataFrame]:
    """
    Get X and Y variables from request data
    """
    Y = model_data[[model_resp["value"]]]
    X = model_data[[datapoint["value"] for datapoint in model_pred]]
    X = sm.add_constant(X)
    return (X, Y)


def compute_cm_scores(
    Y: typing.Union[np.array, pd.DataFrame], Y_pred: np.array
) -> typing.Tuple[float, float, float]:
    """
    Compute metrics from confusion matrix
    """
    cm = sk.metrics.confusion_matrix(Y, list(map(round, Y_pred)))
    recall = cm[0][0] / (cm[0][0] + cm[1][0])
    precision = cm[0][0] / (cm[0][0] + cm[0][1])
    accuracy = cm[0][0] + cm[1][1] / (cm[0][0] + cm[0][1] + cm[1][0] + cm[1][1])
    f_measure = 2 * recall * precision / (recall + precision)
    return recall, accuracy, precision, f_measure


def regression_metrics(
    Y: typing.Union[np.array, pd.DataFrame], Y_pred: np.array
) -> typing.Tuple[float, float, float]:
    """
    Compute regression model metrics
    """
    mae = sk.metrics.mean_absolute_error(Y, Y_pred)
    mse = sk.metrics.mean_squared_error(Y, Y_pred)
    r2 = sk.metrics.r2_score(Y, Y_pred)
    return mae, mse, r2

parseToken = lambda r: r.headers["Authorization"].split(" ")[1]