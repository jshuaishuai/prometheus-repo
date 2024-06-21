import { useEffect, useState } from "react";
import {
  ListObjectsCommand,
  ListBucketsCommand,
  ListObjectsCommandOutput,
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import "./App.css";

function App() {
  const [objects, setObjects] = useState<
    Required<ListObjectsCommandOutput>["Contents"]
  >([]);

  const [client, setClient] = useState<S3Client>();

  useEffect(() => {
    init();
  }, []);
  const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
  const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;

  const init = async () => {
    const s3Client = new S3Client({
      region: "us-west-1",
      credentials: {
        accessKeyId: awsAccessKeyId,
        secretAccessKey: awsSecretAccessKey,
      },
    });
    setClient(s3Client);

    const command = new ListObjectsCommand({ Bucket: "file-ms" });
    const { Contents } = await s3Client.send(command);
    setObjects(Contents || []);

  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log('%c [ file ]-40', 'font-size:13px; background:pink; color:#bf2c9f;', file)
    if (!file) {
      return;
    }

    try {
      const command = new PutObjectCommand({
        Body: file,
        Bucket: 'file-ms',
        Key: `files/${file.name}`, // 设置文件在 S3 上的路径
        ContentType: file.type,
      });
      const response = await client?.send(command);
      console.log('Upload Success', response);

      // 更新文件列表
      const commandList = new ListObjectsCommand({ Bucket: "file-ms" });
      const { Contents } = await client?.send(commandList);
      setObjects(Contents || []);
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  return (
    <div className="App">
      <input type="file" onChange={handleFileUpload} />
      {objects.map((o) => (
        <div key={o.ETag}>{o.Key}</div>
      ))}
    </div>
  );
}

export default App;
