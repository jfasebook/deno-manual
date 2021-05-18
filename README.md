# Introducción

Deno es un runtime para poder lanzar código hecho en Javascript/Typescript.

Ofrece por defecto características de seguridad de ejecución y un único ejecutable muy potente.

Está construido sobre el motor V8 (como nodejs) usando `Rust` y `Tokio`.

# Características

- Seguridad por defecto. El acceso a ficheros, acceso a red o acceso a variables de entorno es necesario que se active de forma explícita.
- Soporta Typescript sin necesidad de babel ni ninguna otra herramienta.
- Contiene muchas herramientas en el ejecutable principal que es `deno` por ejemplo `deno info` o `deno fmt`, para obtener información sobre la gestión de dependencias y formatear el código respectivamente.
- Contiene un repertorio estandard de módulos de deno.
- Puede empaquetar scripts en un único fichero javascript.

# Filosofía
`Deno` se distribuye en un único binario ejecutable. En el binario están todas las herramientas incluido el `runtime` y el gestor de dependencias. Se pueden cargar módulos a partir de importar una URL.

Está muy enfocado como una utilidad para hacer scripts al estilo de `Bash` o `Python`.

# Comparación con Node.js
- Deno no usa `npm`. Los módulos son cargados con URLS o rutas de ficheros.
- Deno no usa `package.json`.
- Todas las acciones asíncronas de `Deno` devuelven una promesa. `Deno` nos proporciona diferentes APIs que `Node`.
- `Deno` requiere permisos explicitos para ficheros, redes y acceso al entorno.
- `Deno` siempre muere por errores no controlados.
- `Deno` emplea `ES Modules` y no soporta `require()`. Los módulos de terceros se importan vía URLS.

```
import * as log from "https://deno.land/std@0.97.0/log/mod.ts";
```

# Otros comportamientos clave

- `Deno` obtiene y almacena en caché el código remoto la primera vez que se ejecuta y no se actualiza nunca a menos que se le añada el flag `--reload`.
- Los módulos o archivos cargados desde URL remotas están pensados para que sean inmutables y se puedan almacenar en caché.


# Instalación
En mi caso que lo instalo en Linux se hace muy sencillo.

```
curl -fsSL https://deno.land/x/install/install.sh | sh
```

Es un script de instalación muy sencillo que instala el binario de `Deno` a nivel de usuario sin ensuciar el sistema.

Lo instala en $HOME/.deno/bin/deno

Si queremos que se instale en un lugar más personalizado lo podemos hacer pásando en el script un valor a DENO_INSTALL por ejemplo

`curl -fsSL https://deno.land/x/install/install.sh | DENO_INSTALL='.' sh` esto añadiría una carpeta bin/ en la ruta que estemos actualmente.

Y cuando termina la instalación te genera las variables de entorno a incluir en tu `.bashrc` o `.zshrc` para poder tener el ejecutable disponible en $PATH. En mi caso he hecho:

```
echo 'export DENO_INSTALL="$HOME/.deno"\nexport PATH="$DENO_INSTALL/bin:$PATH"' >> $HOME/.zshrc
source $HOME/.zshrc
```

Con esto ya tenemos el ejecutable de `deno` disponible, más información de instalación https://deno.land/manual/getting_started/installation

## Actualizar versión de deno
- `deno upgrade` para obtener y reemplazar la versión más estable del ejecutable. Reemplazará la que está en `$HOME/.deno/bin/deno`
- `deno upgrade --version 1.0.1` (para instalar una versión específica de deno).

De hecho no hay necesidad ni de un programa de control de versiones del propio deno (como si necesitaba nodejs con nvm por ejemplo). Ya que el propio deno puede descargar una determinada versión y además evitando sobrescribir el que tenemos instalado "oficial" en nuestro `$HOME`. Para ello podríamos hacer:

`deno upgrade --output $HOME/my_deno --version 1.0.0`

Esto anterior si todo va bien nos dejaría la versión 1.0.0 en la home como un binario llamado `my_deno`.

# Configurar entorno
Podemos configurar la variable `DENO_DIR` que por defecto contiene `$HOME/.cache/deno` ahí es donde `Deno` almacenará toda sus caches.

# Autocompletar shell
El propio ejecutable de `Deno` incorpora una opción para generar las reglas de autocompletado para las distintas shell. Las instrucciones se pueden ver en la documentación oficial. https://deno.land/manual/getting_started/setup_your_environment#shell-autocomplete

Se puede leer la documentación para otras configuraciones para los IDEs y otros temas.

# Primeros pasos

## Hola Mundo

Ejecutaríamos el típico

```
console.log("Welcome to Deno!");
```

De hecho tenemos este programa disponible en https://deno.land/std@0.97.0/examples/welcome.ts y lo podemos probar y ejecutar con:
`deno run https://deno.land/std@0.97.0/examples/welcome.ts`

Para hacer una prueba genero una carpeta examples y dentro pongo un welcome.js con el console.log.

Se puede luego ejecutar con `deno run examples/welcome.js`


Un programa un poco más complejo lo podríamos hacer simulando lo que hace el comando curl. `Deno` incorpora la API `fetch` similar a la que tenemos en el navegador. Podemos usar el ejemplo oficial para ello:

`deno run https://deno.land/std@0.97.0/examples/curl.ts https://deno.land/`

Al ejecutar esto, `Deno` nos lanzará un error y esto es porque este programa requiere permisos de red, por tanto se lo tenemos que decir de forma explícita.

`deno run --allow-net https://deno.land/std@0.97.0/examples/curl.ts https://deno.land/`








Por tanto podemos hacer un código similar al que podemos ver en examples/curl.js que viene a ser igual que la versión que podemos encontrar en https://deno.land/std@0.97.0/examples/curl.ts.

La versión de 