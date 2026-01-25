pipeline {
    agent any

    environment {
        AWS_REGION     = "ap-south-1"        // OR hardcode like "ap-south-1"
        AWS_ACCOUNT_ID = credentials('aws-account-id')    // OR hardcode account ID
        AWS_ACCESS_KEY_ID     = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
        ECR_REGISTRY = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Configure AWS & Login to ECR') {
            steps {
                sh '''
                  aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
                  aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
                  aws configure set region $AWS_REGION

                  aws ecr get-login-password --region $AWS_REGION \
                  | docker login --username AWS --password-stdin $ECR_REGISTRY
                '''
            }
        }

        stage('Build & Push Backend Image') {
            steps {
                sh '''
                  docker build -t backend:latest ./backend
                  docker tag backend:latest $ECR_REGISTRY/backend:latest
                  docker push $ECR_REGISTRY/backend:latest
                '''
            }
        }

        stage('Build & Push Frontend Image') {
            steps {
                sh '''
                  docker build -t frontend:latest ./frontend
                  docker tag frontend:latest $ECR_REGISTRY/frontend:latest
                  docker push $ECR_REGISTRY/frontend:latest
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Docker images pushed to ECR successfully"
        }
        failure {
            echo "❌ Pipeline failed"
        }
        cleanup {
            sh 'docker system prune -f'
        }
    }
}
