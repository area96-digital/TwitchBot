FROM python:3.12-alpine

WORKDIR /app

RUN python3 -m pip install --user pipenv && \
    python3 -m pipenv install

COPY main.py /app/main.py

RUN python3 -m pipenv run python main.py