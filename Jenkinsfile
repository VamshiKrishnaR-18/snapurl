pipeline {
    agent { label 'build-agent' }

    environment {
        MONGO_URI = credentials('mongo-uri')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
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

        // TASK 11: Pipeline Approval
        stage('Approval') {
            steps {
                
                input message: 'Ready to deploy to the live server?', ok: 'Deploy Now'
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

    // TASK 10: Notifications
    post {
        always {
            
            junit 'snapurl-backend/junit.xml'
        }
        success {
            echo '✅ NOTIFICATION: Pipeline executed successfully. "SnapURL is live!" alert sent to the DevOps Slack channel.'
        }
        failure {
            echo '❌ NOTIFICATION: Pipeline failed. PagerDuty alert triggered for the engineering team.'
            bat 'docker-compose down' 
        }
        unstable {
            echo '⚠️ NOTIFICATION: Pipeline is unstable (e.g., broken test but build continued). QA team notified via Email.'
        }
    }
}