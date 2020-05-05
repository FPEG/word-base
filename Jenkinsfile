pipeline {
    agent any
    stages {
        stage('build') {
            agent {
                    dockerfile  {
                        filename 'Dockerfile'
                        dir 'public'
                        label 'my-defined-label'
                    }
                }
            steps {
                sh 'yarn --version'
                sh 'yarn install'
				sh 'yarn build'
                sh 'rm -rf /opt/nginx/www/WordBase/static'
                sh 'rm -rf /opt/nginx/www/WordBase/index.html'
                sh 'cp -r build/static /opt/nginx/www/WordBase/static'
                sh 'cp -r build/index.html /opt/nginx/www/WordBase/index.html'
            }
        }
    }
}