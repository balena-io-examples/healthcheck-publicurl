# Healthcheck with Public Device URL

Demo project of using the Docker [`HEALTHCHECK`](https://docs.docker.com/engine/reference/builder/#healthcheck) functionality for a balena project.

It's a simple web application, which has a status endpoint, through which it can signal that that the service is unhealthy. The `Dockerfile`'s `HEALTHCHECK` command will query that endpoint, and if the check fails, it will restart the service automatically:

```
HEALTHCHECK --start-period=5s --timeout=30s --interval=5s --retries=1 \
    CMD curl --silent --fail localhost:8080/status
```

Here the `--start-period`, `--timeout`, `--interval`, and `--retries` values are set to pretty short so that the demo works quickly, in your application you need to set them as appropriate (see the default values on the linked `HEALTHCHECK` docs page above).

To use this, [deploy the code on balenaCloud](https://docs.balena.io/learn/getting-started/raspberrypi3/nodejs/), enable the [Public Device URL](https://docs.balena.io/learn/manage/actions/#enable-public-device-url), and open the page, showing the service's status and provide tools to trigger an unhealthy state.

The working page:

![working](images/working.png)

Pressing the `Break Things` button will predictably break things inside the application, which puts the service in a state that the healthcheck will catch:

![broken](images/broken.png)

After the healthcheck kicks in, the service will be restarted in a good state, and the page will show a working state again, and the uptime will show that it was just restarted.

If logged in to the device's Host OS, `balena ps` will show the state of the containers, and whether or not they are healthy:

![balena ps](images/balena_ps.png)
