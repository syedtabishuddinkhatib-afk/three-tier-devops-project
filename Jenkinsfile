pipeline {
    agent any

    parameters {
        booleanParam(name: 'BUILD_BACKEND', defaultValue: true, description: 'Build & push backend image')
        booleanParam(name: 'BUILD_FRONTEND', defaultValue: true, description: 'Build & push frontend image')
        booleanParam(name: 'UPDATE_MANIFESTS', defaultValue: true, description: 'Update Kubernetes YAMLs')
        booleanParam(name: 'DEPLOY_TO_K8S', defaultValue: true, description: 'Apply manifests to Kubernetes')
    }

    environment {
        AWS_REGION     = "ap-south-1"
        AWS_ACCOUNT_ID = credentials('aws-account-id')

        AWS_ACCESS_KEY_ID     = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')

        ECR_REGISTRY = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
        IMAGE_TAG = "${GIT_COMMIT.take(7)}"

        KUBECONFIG = credentials('kubeconfig')
        GITHUB_TOKEN = credentials('github-token')
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Login to ECR') {
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
            when { expression { params.BUILD_BACKEND } }
            steps {
                sh '''
                  docker build -t backend:$IMAGE_TAG ./backend
                  docker tag backend:$IMAGE_TAG $ECR_REGISTRY/backend:$IMAGE_TAG
                  docker push $ECR_REGISTRY/backend:$IMAGE_TAG
                '''
            }
        }

        stage('Build & Push Frontend Image') {
            when { expression { params.BUILD_FRONTEND } }
            steps {
                sh '''
                  docker build -t frontend:$IMAGE_TAG ./frontend
                  docker tag frontend:$IMAGE_TAG $ECR_REGISTRY/frontend:$IMAGE_TAG
                  docker push $ECR_REGISTRY/frontend:$IMAGE_TAG
                '''
            }
        }

        stage('Update Kubernetes Manifests') {
            when { expression { params.UPDATE_MANIFESTS } }
            steps {
                sh '''
                  sed -i "s|image: .*backend.*|image: $ECR_REGISTRY/backend:$IMAGE_TAG|" \
                    database/Kubernetes/k8s-backend/deployment.yaml

                  sed -i "s|image: .*frontend.*|image: $ECR_REGISTRY/frontend:$IMAGE_TAG|" \
                    database/Kubernetes/k8s-frontend/deployment.yaml

                  git config user.name "jenkins"
                  git config user.email "jenkins@ci.local"
                  git add database/Kubernetes/
                  git commit -m "Update image tags to $IMAGE_TAG" || true
                  git push https://$GITHUB_TOKEN@github.com/<ORG>/<REPO>.git HEAD:main
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            when { expression { params.DEPLOY_TO_K8S } }
            steps {
                sh '''
                  kubectl apply -f database/Kubernetes/k8s-backend/
                  kubectl apply -f database/Kubernetes/k8s-frontend/
                '''
            }
        }
    }

    post {
        success {
            echo "🚀 Pipeline completed successfully"
        }
    }
}
