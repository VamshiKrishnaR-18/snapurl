pipeline {
    agent { label 'build-agent' }

    environment {
        MONGO_URI = credentials('mongo-uri')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/VamshiKrishnaR-18/snapurl.git',
                credentialsId: 'github-creds'
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies and building...'
                dir('snapurl-backend') {
                    bat 'npm install'
                }
                dir('snapurl-frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running unit tests before building Docker image...'
                dir('snapurl-backend') {
                    bat 'npm test'
                }
            }
        }

        stage('Docker Image Build') {
            steps {
                echo 'Tests passed! Building Docker images...'
                bat 'docker-compose build'
            }
        }

        stage('Docker Container Run') {
            steps {
                echo 'Starting containers...'
                bat 'docker-compose up -d'
            }
        }

        stage('Application Test') {
            steps {
                echo 'Waiting for services to start, then verifying API...'
                sleep time: 5, unit: 'SECONDS'
                bat 'curl http://localhost:5001'
            }
        }
    }

    post {
        always {
            echo 'Publishing test reports and cleaning up containers...'
            junit 'snapurl-backend/junit.xml'
            bat 'docker-compose down'
        }
        success {
            echo 'Task 8 Pipeline executed successfully ✅'
        }
        failure {
            echo 'Pipeline failed ❌'
        }
    }
}