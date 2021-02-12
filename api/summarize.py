import trafilatura
from sumy.parsers.html import HtmlParser
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer as Summarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words
from flask import Flask, request, jsonify, Response
from ratelimit import limits
import nltk

nltk.download('punkt')


def summarize_text(text, length):
    
    y = text
    length = length

    LANGUAGE = "english"
    parser = PlaintextParser.from_string(y,Tokenizer("english"))
    stemmer = Stemmer(LANGUAGE)
    summarizer = Summarizer(stemmer)
    summarizer.stop_words = get_stop_words(LANGUAGE)
    
    response = []
    l = len(y.split(". "))
    SENTENCES_COUNT = int(l*float(length))*2
      
    for sentence in summarizer(parser.document, SENTENCES_COUNT):
        response.append(str(sentence) + "  ")
    
    res = ""  

    for s in response:  
        res += s   
    
    return res

