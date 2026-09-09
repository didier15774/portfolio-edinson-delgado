@{
    # Copiar a deploy.config.ps1 y completar credenciales locales.
    # deploy.config.ps1 NO se versiona (.gitignore).
    # No pegar IP, usuario SSH, puertos ni rutas reales de Hostinger en este ejemplo.

    SshHost          = 'YOUR_SSH_HOST'
    SshPort          = 22
    SshUser          = 'YOUR_SSH_USER'

    # Opcion 1: contrasena (preferir variable DEPLOY_SSH_PASSWORD)
    SshPassword      = ''

    # Opcion 2: clave privada SSH
    SshKeyPath       = ''

    # Confirmar con validate_remote.ps1 antes del primer deploy.
    # Las rutas reales viven solo en deploy.config.ps1 (local) o en el panel del hosting.
    RemoteAppPath    = '/home/YOUR_SSH_USER/domains/YOUR_DOMAIN/public_html'
    RemoteDeployPath = '/home/YOUR_SSH_USER/deploy/portfolio-edinson'
    DomainPath       = '/home/YOUR_SSH_USER/domains/YOUR_DOMAIN'
    SiteUrl          = 'https://edinson.proyectocolmena.com/'

    # Archivo de secretos PHP en servidor (se preserva entre deploys)
    PreserveRemoteFiles = @(
        'api/contact.config.php'
    )
}
