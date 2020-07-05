from django.db import connection

def get_len(rawqueryset):
    def __len__(self):
        params = ["""'%s'""" % p for p in self.params]
        sql = 'SELECT COUNT(*) FROM (' + (rawqueryset.raw_query % tuple(params)) + ') B;'
        cursor = connection.cursor()
        cursor.execute(sql)
        row = cursor.fetchone()
        return row[0]
    return __len__
