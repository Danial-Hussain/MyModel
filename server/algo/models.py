from djongo import models

class Feature(models.Model):
    feature_name = models.CharField(max_length=100)

    class Meta:
        abstract = True

    def __str__(self) -> str:
        return f"{self.feature_name}"

class Metric(models.Model):
    metric_name = models.CharField(max_length=100)
    metric_value = models.FloatField()

    class Meta:
        abstract = True

    def __str__(self) -> str:
        return f"{self.metric_name}: {self.metric_value}"

class MachineLearningModel(models.Model):
    '''
        MachineLearningModel(
            username = '...',
            model_name = '...',
            folder_name = '...',
            model_type = '...',
            created_at = datetime.datetime.now(),
            predictors = [
                {'feature_name': '...'},
                {'feature_name': '...'}
                ...
                {'feature_name': '...'}
            ],
            response = {'feature_name': '...'},
            metrics = [
                {'metric_name': '...'},
                {'metric_name': '...'},
                ...
                {'metric_name': '...'}
            ]
        )
    '''
    username = models.CharField(max_length=255)
    model_name = models.CharField(max_length=255)
    folder_name = models.CharField(max_length=255)
    model_type = models.CharField(max_length=255)
    created_at = models.DateField(auto_now_add=True)
    predictors = models.ArrayField(model_container=Feature)
    response = models.EmbeddedField(model_container=Feature)
    metrics = models.ArrayField(model_container=Metric)

    def __str__(self) -> str:
        return f"{self.username}: {self.model_name}"