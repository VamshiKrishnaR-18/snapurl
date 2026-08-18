node {
    try {
        stage('Checkout') {
            echo 'Pulling source code...'
            checkout scm
        }
        
        stage('Build Backend') {
            echo 'Installing dependencies...'
            dir('snapurl-backend') {
                bat 'npm install'
            }
        }
        
        stage('Result') {
            echo 'Scripted Pipeline executed successfully.'
        }
    } catch (Exception e) {
        // Manually catching errors since there is no built-in 'failure' block
        echo "Pipeline failed: ${e.getMessage()}"
        currentBuild.result = 'FAILURE'
    } finally {
        // This acts like the 'always' and 'cleanup' blocks
        echo 'Cleaning up workspace...'
        cleanWs()
    }
}
