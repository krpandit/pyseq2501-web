import asyncio
import logging

from pyseq2.utils.log import setup_logger


class AsyncQueueStream:
    def __init__(self, q: asyncio.Queue[str]) -> None:
        self.q = q

    def write(self, __s: str) -> None:
        self.q.put_nowait(__s)


def setup_web_logger(
    q: asyncio.Queue[str] | None = None, *, set_root: bool = True, save: bool = False, level: str = "INFO"
) -> logging.Logger:

    setup_logger(set_root=set_root, save=save, level=level)
    server_logger = logging.getLogger("server")

    if q:
        web_handler = logging.StreamHandler(AsyncQueueStream(q))
        web_handler.setLevel("INFO")
        web_handler.setFormatter(logging.Formatter("%(message)s"))
        # if set_root:
        logging.getLogger("pyseq2").handlers.append(web_handler)
        server_logger.handlers.append(web_handler)

    for _log in ["uvicorn", "uvicorn.error", "fastapi"]:
        logging.getLogger(_log).handlers = []
        logging.getLogger(_log).setLevel(level)

    return server_logger