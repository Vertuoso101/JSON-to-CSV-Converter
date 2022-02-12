pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building with node'
                nodejs('node') {
                    sh 'yarn install'
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
