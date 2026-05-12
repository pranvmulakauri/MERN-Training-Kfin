const redis = require("redis");

const workerClient = redis.createClient({
  url: "redis://localhost:6379",
});

workerClient.on("error", (err) => {
  console.log("Worker Redis Error", err);
});

const worker = async () => {

  await workerClient.connect();

  console.log("Worker connected");

  while (true) {
    try {

      const result = await workerClient.brPop("investorQueue", 0);

      console.log("Received:", result);

      if (result) {

        const data = JSON.parse(result.element);

        console.log("Parsed Data:", data);
      }

    } catch (e) {
      console.log(`Redis Queue error : ${e}`);
    }
  }
};

module.exports = worker;