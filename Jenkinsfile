pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.49.1-noble'
            args '-u root:root'
        }
    }
    stages {
        stage('Clone Repository') {
            steps {
                checkout scm: [
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                //userRemoteConfigs: [[url: 'https://github.com/dj199108/PlayWright.git']]
                ]
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test --reporter=html'
            }
        }
    }
    post {
        always {
            publishHTML([
                reportName: 'Playwright Test Report',
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: false
            ])
        }
    }
}
