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
                echo 'Running unit tests...'
                dir('snapurl-backend') {
                    bat 'npm test'
                }
            }
        }

        stage('Docker Image') {
            steps {
                echo 'Building Docker images...'
                bat 'docker-compose build'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application to the Test Server environment...'
                bat 'docker-compose up -d'
            }
        }

        stage('Application Verification') {
            steps {
                echo 'Verifying the live deployment...'
                sleep time: 5, unit: 'SECONDS'
                bat 'curl http://localhost:5001'
            }
        }
    }

    post {
        always {
            // We still want test reports every time
            junit 'snapurl-backend/junit.xml'
        }
        success {
            // Look here! No container teardown. The app stays running!
            echo 'Task 9: Application successfully DEPLOYED to the test environment! 🚀'
        }
        failure {
            echo 'Deployment failed ❌ Rolling back/Cleaning up...'
            bat 'docker-compose down' 
        }
    }
}