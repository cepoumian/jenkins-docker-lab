pipeline {
    agent any

    environment {
        IMAGE_NAME = "cepoumian/jenkins-node-demo"
        DOCKERHUB = credentials('dockerhub')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Test') {
            steps {
              sh 'docker run --rm -v "$PWD":/app -w /app node:22-alpine sh -lc "npm ci && npm test"'
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${env.BUILD_NUMBER} ."
            }
        }

        stage('Push Image') {
            steps {
              sh """
                  echo "${DOCKERHUB_PSW}" | docker login -u "${DOCKERHUB_USR}" --password-stdin
                  docker push ${IMAGE_NAME}:${env.BUILD_NUMBER}
                  docker logout
                """
            }
        }

        stage('Deploy') {
            steps {
                sh """
                    docker rm -f jenkins-node-demo || true
                    docker run -d --name jenkins-node-demo -p 3000:3000 ${IMAGE_NAME}:${env.BUILD_NUMBER}
                """
            }
        }

        // Opcional:
        // stage('Run container') {
        //     steps {
        //         sh "docker rm -f jenkins-node-demo || true"
        //         sh "docker run -d --name jenkins-node-demo -p 3000:3000 ${IMAGE_NAME}:${env.BUILD_NUMBER}"
        //     }
        // }
    }
}
