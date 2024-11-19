from flask import Flask, request, jsonify
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.linear_model import LinearRegression

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    file = request.files['file']
    data = pd.read_csv(file)
    
    # Example: KMeans Clustering
    if request.form['task'] == 'clustering':
        kmeans = KMeans(n_clusters=3)
        data['cluster'] = kmeans.fit_predict(data)
        return jsonify(data.to_dict(orient='records'))
    
    # Example: Linear Regression
    elif request.form['task'] == 'regression':
        X = data[request.form['x']].values.reshape(-1, 1)
        y = data[request.form['y']]
        model = LinearRegression().fit(X, y)
        return jsonify({'coef': model.coef_[0], 'intercept': model.intercept_})

    return jsonify({'error': 'Invalid task'})

if __name__ == '__main__':
    app.run(port=5001)
