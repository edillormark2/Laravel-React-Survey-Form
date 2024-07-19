<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyQuestionAnswer extends Model
{
    protected $fillable = [
        'survey_id', // Ensure this matches the actual column name in your database
        'survey_answer_id',
        'survey_question_id',
        'answer',
    ];

    // Define the relationship with Survey model
    public function surveyAnswer()
    {
        return $this->belongsTo(SurveyAnswer::class);
    }

}