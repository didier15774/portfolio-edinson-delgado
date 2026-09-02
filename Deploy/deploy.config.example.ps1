@{
    # Copiar a deploy.config.ps1 y completar credenciales.
    # deploy.config.ps1 NO se versiona (.gitignore).

    SshHost          = '149.62.37.221'
    SshPort          = 65002
    SshUser          = 'u506984013'

    # Opcion 1: contrasena (preferir variable DEPLOY_SSH_PASSWORD)
    SshPassword      = ''

    # Opcion 2: clave privada SSH
    SshKeyPath       = ''

    # Confirmar con validate_remote.ps1 antes del primer deploy
    RemoteAppPath    = '/home/u506984013/domains/edinson.proyectocolmena.com/public_html'
    RemoteDeployPath = '/home/u506984013/deploy/portfolio-edinson'
    DomainPath       = '/home/u506984013/domains/edinson.proyectocolmena.com'
    SiteUrl          = 'https://edinson.proyectocolmena.com/'

    # Archivo de secretos PHP en servidor (se preserva entre deploys)
    PreserveRemoteFiles = @(
        'api/contact.config.php'
    )
}
