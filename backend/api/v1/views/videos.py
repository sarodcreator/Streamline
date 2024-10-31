#!/usr/bin/env python3
"""these endpoints don't require auth"""
from datetime import datetime
import jwt
from flask import request, abort, jsonify, Response, current_app, Blueprint, render_template
# from api.v1.views import app_views
import html
from models.video import Video
import os
import re

video_views = Blueprint('video_views', __name__, url_prefix='/video')


# Go the endpoint below to test the streaming api,
# the name of the variable should be the name of the video you want to stream without the extension
# provided that the video is located in the api/v1/video_dir,
# if not create the folder in the above location and add the video in the directory
# NOTE: THIS ENDPOINT IS ONLY FOR TESTING

@video_views.get("/testing/<name>", strict_slashes=False)
def testing(name):
    """Just to test if the video streaming end point is working.
    To confirm that it is working, just go to this url
    """
    return render_template("index.html", name=name)


@video_views.route("/play_video/<name>", strict_slashes=False, methods=["GET"])
def play_video(name):
    """
    Streams a vidoes with the name "name" to the user browser in chucks
    name: the name of the movie to stream with the extension
    The api should be used inside video tag.
    You cannot call this api directly, unless you add the range header when calling it.
    """
    range = request.headers.get("range")
    if not range:
        abort(400, "Requires Range header")

    videoPath = f"api/v1/video_dir/{name}"
    videoSize = os.path.getsize(videoPath)
    CHUNK_SIZE = 10 ** 6 #size of the data to transfer at once, set to 1MB

    start = int(re.sub(r"\D", "", range))
    end = min(start + CHUNK_SIZE, videoSize - 1)
    content_length = end - start + 1

    with open(videoPath, "rb") as f:
        f.seek(start)
        data = f.read(content_length)
    
    response = Response(data, 206, mimetype="video/mp4")
    response.headers.add("Content-Range", f"bytes {start}-{end}/{videoSize}")
    response.headers.add("Accept-Range", "bytes")
    response.headers.add("Content-Length", content_length)
    response.headers.add("Content-Type", "video/mp4")
    return response


@video_views.route("/", methods=["POST"], strict_slashes=False)
def add_video():
    """
    Add a new video to the database
    to add a new video, below are list of keys you need to add a new video:
        title: The title of the video (required)
        description: Overview of the video (required)
        genre: comma seperated genres for the movies (required) example, Action, Horro, Sci-Fi
        release_date: the date the movies is released officially
        total_rating: The rating of the movie
        video_url: endpoint that can be used to stream the movie expample, /video/play_video/deadpool.mp4
        thumbnail_url: the url for the poster of the video
        trailer_url: the url for the trailer, you can use youtube embedded link
    """

    data = request.get_json()

    if data is None:
        abort(400)

    video_name = data.get("title")
    if not video_name:
        abort(400, "name is missing")
    
    description = data.get("description")
    if description is None:
        abort(400, "description is missing")
    
    genre = data.get("genre")
    if genre is None:
        abort(400, "genre is missing")

    release_date = data.get("release_date")
    if release_date is None:
        abort(400, "release_date is missing")

    video_obj = Video()
    video_obj.title = video_name
    video_obj.description = description
    video_obj.total_rating = data.get("total_rating", 0)
    video_obj.video_url = data.get("video_url")
    video_obj.thumbnail_url = data.get("thumbnail_url")
    video_obj.trailer_url = html.escape(data.get("trailer_url")) if data.get("trailer_url") else None
    video_obj.genre = genre.split(",")
    video_obj.release_date = datetime.strptime(release_date, "%m-%d-%Y")
    
    try:
        video_obj.save()
        return video_obj.to_json()
    except Exception as e:
        abort(400, e)
        
@video_views.route("/<id>", methods=["PUT"], strict_slashes=False)
def update_video(id):
    """
    Update the data of the video object and save it to the database
    specified by it id
    """
    from models import storage
    video = storage.get(Video, id)
    
    if video is None or video == {}:
        abort(400, "No video with the specified id")
    try:
        data = request.get_json()
        if "created_at" in data:
            del data["created_at"]
        
        if "release_date" in data:
            data["release_date"] = datetime.strftime("%m-%d-%Y")
        video.update(data)
        video.save()
    except Exception as e:
        abort(400, e)
    return jsonify({
        "status": "Success"
    })
    

@video_views.route("/", methods=["GET"], strict_slashes=False)
def get_videos():
    """
    get all the videos in the database
    """
    from models import storage
    try:
        all_videos = storage.all(Video)
        for key, obj in all_videos.items():
            all_videos[key] = obj.to_json()
        return jsonify(all_videos)
    except Exception as e:
        abort(400, e)


@video_views.route("/<id>", methods=["GET"], strict_slashes=False)
def get_video_by_id(id):
    """
    get a user by it id and return the video in json format
    """
    from models import storage

    video = storage.get(Video, id)

    if video is None or video == {}:
        abort(400, "There is no video with the specified id")
    
    return jsonify(video.to_json())