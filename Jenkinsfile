pipeline {
    agent any

    environment {
        IMAGE_NAME = "cepoumian/jenkins-node-demo"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Test') {
          steps {
              sh '/usr/local/bin/docker run --rm -v "$PWD":/app -w /app node:22-alpine sh -lc "npm ci && npm test"'
          }
}

        stage('Docker Build') {
            steps {
                sh '/usr/local/bin/docker build -t ${IMAGE_NAME}:${env.BUILD_NUMBER} .'
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
