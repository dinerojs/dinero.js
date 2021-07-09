const skipPrepare = process.env.SKIP_PREPARE;
const exitCode = Number(!skipPrepare);

process.exit(exitCode);
