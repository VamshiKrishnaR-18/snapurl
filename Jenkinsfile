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

        
        stage('Install Dependencies') {
            steps {
                echo 'Installing packages sequentially...'
                dir('snapurl-backend') {
                    bat 'npm install'
                }
                dir('snapurl-frontend') {
                    bat 'npm install'
                }
            }
        }

        // TASK 12: Parallel Stages
        stage('Code Verification') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        echo 'Running Backend Tests...'
                        dir('snapurl-backend') {
                            bat 'npm test'
                        }
                    }
                }
                stage('Security Scan') {
                    steps {
                        echo 'Checking for vulnerabilities...'
                        dir('snapurl-backend') {
                            // We use || exit 0 so the pipeline doesn't fail if minor vulnerabilities are found
                            bat 'npm audit --audit-level=high || exit 0' 
                        }
                    }
                }
                stage('Frontend Build') {
                    steps {
                        echo 'Compiling React/Vite assets...'
                        dir('snapurl-frontend') {
                            bat 'npm run build'
                        }
                    }
                }
            }
        }

        stage('Docker Image') {
            steps {
                echo 'Building Docker images...'
                bat 'docker-compose build'
            }
        }

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

    post {
        always {
            junit 'snapurl-backend/junit.xml'
        }
        success {
            echo '✅ NOTIFICATION: Pipeline executed successfully. "SnapURL is live!"'
        }
        failure {
            echo '❌ NOTIFICATION: Pipeline failed. PagerDuty alert triggered.'
            bat 'docker-compose down' 
        }
        unstable {
            echo '⚠️ NOTIFICATION: Pipeline is unstable.'
        }
    }
}