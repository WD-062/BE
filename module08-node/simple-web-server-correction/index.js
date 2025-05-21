import http from 'http';
import {
    createFileWithMessage,
    deleteFileByName,
    readFileByName,
} from './fsUtils.js';

const requestHandler = async (req, res) => {
    const regex = /^\/files\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+\.txt$/;
    const { method, url } = req;
    // console.log(method, url);
    res.setHeader('Content-Type', 'application/json');
    if (url === '/files') {
        if (method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                const parsedBody = JSON.parse(body);
                // console.log(parsedBody.content);
                await createFileWithMessage(parsedBody.content);
                res.statusCode = 201;
                // res.setHeader('Content-Type', 'application/json');
                return res.end(
                    JSON.stringify({
                        msg: 'File created',
                        content: parsedBody.content,
                    })
                );
            });
        }
        // res.setHeader('Content-type', 'application/json');
        res.statusCode = 405;
        return res.end(
            JSON.stringify({
                error: 'Invalid method. Can only POST on this route.',
            })
        );
    }
    if (regex.test(url)) {
        const filePath = url.slice(7);
        if (method === 'GET') {
            const fileContent = await readFileByName(filePath);

            if (!fileContent) {
                res.statusCode = 404;
                return res.end(JSON.stringify({ error: 'File not found' }));
            }

            res.statusCode = 200;
            return res.end(
                JSON.stringify({
                    msg: `${filePath} Contents`,
                    content: fileContent,
                })
            );
        }
        if (method === 'DELETE') {
            await deleteFileByName(filePath);
            res.statusCode = 200;

            return res.end(
                JSON.stringify({ msg: `Deleted file: ${filePath}` })
            );
        }
        // res.setHeader('Content-type', 'application/json');
        res.statusCode = 405;
        return res.end(
            JSON.stringify({
                error: 'Invalid method. Can only GET and DELETE on this route.',
            })
        );
    }
    // res.setHeader('Content-type', 'application/json');
    res.statusCode = 404;
    return res.end(
        JSON.stringify({
            error: 'Route not found',
        })
    );
};

const server = http.createServer(requestHandler);

const port = 3000;

server.listen(port, () =>
    console.log(`Server running at http://localhost:${port}/`)
);
