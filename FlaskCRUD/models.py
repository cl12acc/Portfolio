from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class filmModel(db.Model):
    __tablename__ = "tblfilms"
 
    filmID = db.Column(db.Integer, primary_key=True, )
    title = db.Column(db.String())
    yearReleased = db.Column(db.Integer())
    rating = db.Column(db.String())
    duration = db.Column(db.Integer())
    genre = db.Column(db.String())
 
    def __init__(self,title,yearReleased,rating,duration,genre):
        self.title = title
        self.yearReleased = yearReleased
        self.rating = rating
        self.duration = duration
        self.genre = genre
    
        def __repr__(self):
            return f"{self.title}"