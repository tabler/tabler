<p align="center">
<a href="https://github.com/tabler/tabler"><img src="https://raw.githubusercontent.com/tabler/tabler/dev/src/static/logo.svg" alt="A premium and open source dashboard template with a responsive and high-quality UI." width="300"></a><br><br>
A premium and open source dashboard template with a responsive and high-quality UI.
</p>

## 📦 Setup environment

To run our documentation locally, first follow the steps in the main [Tabler README](https://github.com/tabler/tabler/blob/dev/README.md) to set up dependencies.

## Build documentation locally

You need to have `pnpm` installed.

1. From the `/tabler/site` directory, run `pnmp install` to install dependencies in the command line.
2. Then execute `pnpm run build` to build the Next site which holds Tabler documentation.
3. Execute `pnpm run start` to start the Next site.
   - A success may look like
   ```
    > start
    > next start

    ▲ Next.js 13.5.3
    - Local:        http://localhost:3000

    ✓ Ready in 1513ms

   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the documentation site, a local version of [tabler.io/docs](https://tabler.io/docs).

**Note**: *To see a full list of possible documentation site command line commands, go to `tabler/site/package.json`.*

## License

See the [LICENSE](https://github.com/tabler/tabler/blob/master/LICENSE) file.
