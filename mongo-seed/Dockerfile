FROM mongo

COPY products.json /products.json

CMD mongoimport --host mongo --collection products --type json --file /products.json --jsonArray