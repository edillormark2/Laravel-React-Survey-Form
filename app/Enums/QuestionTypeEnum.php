<?php

namespace App\Enums;

enum QuestionTypeEnum: string
{
    case Text = 'short answer';
    case Textarea = 'paragraph';
    case Select = 'dropdown';
    case Radio = 'multiple choice';
    case Checkbox = 'checkboxes';
}
