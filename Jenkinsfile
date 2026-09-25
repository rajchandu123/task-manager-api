pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test -- --runInBand'
            }
        }

        stage('Docker Build & Push') {
            environment {
                DOCKER_HOST = 'npipe:////./pipe/dockerDesktopLinuxEngine'
            }

            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    bat '''
                        docker login -u "%DOCKER_USERNAME%" -p "%DOCKER_PASSWORD%"
                        docker build -t %DOCKER_USERNAME%/task-manager-api:%BUILD_NUMBER% .
                        docker push %DOCKER_USERNAME%/task-manager-api:%BUILD_NUMBER%
                    '''
                }
            }
        }
    }
}