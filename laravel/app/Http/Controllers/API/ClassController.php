<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Mail\ClassInvitation;
use App\Models\Classes;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Models\SessionUser;
class ClassController extends Controller
{
    public function index(Request $request) {
        if (!$request->bearerToken()) {
            return response()->json([
                'error' => 'Unauthorized',
            ], 401);
        }

        $sessionUser = SessionUser::where('token', $request->bearerToken())->first();
        if (!$sessionUser) {
            return response()->json([
                'error' => 'Session user not found',
            ], 404);
        }
        $user =User::find($sessionUser->user_id);

        $user_id = $user->id;
        
        $teacher_classes = Classes::where('instructor_id',$user_id)->get();

        $student_classes = Classes::whereHas('enrollments',function ($query) use ($user_id){
            $query->where('user_id',$user_id)
            ->where('status','confirmed');
        })->get();

        $all_classes = $teacher_classes->concat($student_classes);
        
        return response()->json($all_classes);
    }

    public function createClassAndInvite(Request $request)  {
        $class = new Classes;
        $class->name = $request->name;
        $class->teacher_id = Auth::id(); 
        $class->save();

        $class = Classes::where('name', $request->name)->first();
        if(!$class){
            return response()->json([
                "code"=> 404,
                'message' => 'class does not exist'
            
            ], 404);
        }

        $emails = $request->emails;

        foreach($emails as $email){
            $student = User::where('email', $email)->first();
            if (!$student) {
                continue;
            }

            Mail::to($email)->send(new ClassInvitation($class));
            $enrollment = new Enrollment;
            $enrollment->user_id = $request->$student->id;
            $enrollment->class_id = $request->class_id;
            $enrollment->status = 'pending'; 
            $enrollment->save();
        }
        return response()->json([
            'message' => 'successfully invite student to class and created class'
        ], 201);
        
    }

    public function getClass(){
        $Classes = Classes::all();

        return response()->json($Classes);
    }

}
