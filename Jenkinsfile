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

        stage('Docker Build') {
            environment {
                DOCKER_HOST = 'npipe:////./pipe/dockerDesktopLinuxEngine'
            }

            steps {
                bat 'docker build -t task-manager-api:%BUILD_NUMBER% .'
            }
        }
    }
}