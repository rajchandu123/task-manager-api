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

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    bat '''
                        ssh -o StrictHostKeyChecking=no ec2-user@ec2-16-171-12-29.eu-north-1.compute.amazonaws.com "docker pull chandankum123/task-manager-api:%BUILD_NUMBER% && docker stop task-manager-api || true && docker rm task-manager-api || true && docker run -d --name task-manager-api -p 3000:3000 chandankum123/task-manager-api:%BUILD_NUMBER%"
                    '''
                }
            }
        }
    }
}