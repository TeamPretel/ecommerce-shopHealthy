1)- ESTRUCTURAR EL RESTO DEL TRABAJO, SI USAMOS REDUX TOOLKIT. 
2)- FALTAN AGREGAR LAS DEPENDENCIAS DEL FRONT END QUE VAMOS A USAR.
3)- ORGANIZAR EL README CON CIERTAS REGLAS SOBRE VARIABLES, IDIOMA DEL PROYECTO, FUNCIONES GLOBALES,ETC.


Hola! Soy el javo desquiciado desde el readme :D

Prueba Ceci readme rama!
Hola soy el gabooo desde el readmeeeeeeeee!!!!

# Comandos importantes de linux:

## Los más basicos:
```bash
# ip de TruquitosDeployer: 31.220.49.30
mkdir # Crear directorio
systemctl status postgresql # Ver si postgres está corriendo
sudo systemctl enable postgresql --now # Habilitar postgres
sudo systemctl start postgresql # Encender proceso postgres
sudo systemctl stop postgresql # Apagar proceso postgres
sudo systemctl restart postgresql # Reiniciar proceso postgres
```

## Listar todos los procesos activos y con puerto asociado:
```bash
sudo lsof -i -P -n | grep LISTEN
```

## Configurar SSH

Viene de https://code.visualstudio.com/docs/remote/ssh 

y https://code.visualstudio.com/docs/remote/troubleshooting


```bash
# Archivo de configuración de vscode:
Host *
    ForwardAgent yes
    # Esto todavia no lo probamos...
    #ControlMaster auto
    #ControlPath  ~/.ssh/sockets/%r@%h-%p
    #ControlPersist  600
Host name-of-ssh-host-here
    User your-user-name-on-host
    HostName host-fqdn-or-ip-goes-here
    IdentityFile ~/.ssh/id_ed25519-remote-ssh

# Config. de extension ssh de vscode:
"remote.SSH.showLoginTerminal": true,
"remote.SSH.useLocalServer": false

#Generamos keygen
ssh-keygen -t rsa -b 4096 

# Copiamos llave a remoto  
export USER_AT_HOST="your-user-name-on-host@hostname"
export PUBKEYPATH="$HOME/.ssh/id_ed25519.pub"
ssh-copy-id -i "$PUBKEYPATH" "$USER_AT_HOST"

# Autorizamos a local 
$USER_AT_HOST="your-user-name-on-host@hostname"
$PUBKEYPATH="$HOME\.ssh\id_ed25519.pub"
$pubKey=(Get-Content "$PUBKEYPATH" | Out-String); ssh "$USER_AT_HOST" "mkdir -p ~/.ssh && chmod 700 ~/.ssh && echo '${pubKey}' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

## Configurar DB's de postgres

```bash
sudo -i -u postgres
sudo su - postgres -c "createuser <name>"
sudo su - postgres -c "createdb <namedb>"
sudo -u postgres psql
GRANT ALL PRIVILEGES ON DATABASE <usernamedb> TO <name>;
exit
``` 

Todo esto vino de https://es.linuxcapable.com/how-to-install-and-configure-postgresql-on-ubuntu-20-04


## SSH ... permisos de archivos en carpeta .ssh 

```bash
chmod 400 ~/.ssh/id_rsa
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

## Listar users:
```bash
awk -F: '{ print $1}' /etc/passwd
```