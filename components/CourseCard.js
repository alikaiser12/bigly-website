import Link from 'next/link';

export default function CourseCard({ course }) {
  return (
    <Link href={`/course/${course.slug}`} className="block bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden">
      <div className="relative">
        <img src={course.thumbnail} alt={course.title} className="w-full h-44 object-cover" />
        <div className="absolute left-3 bottom-3 bg-black/60 text-white px-2 py-1 rounded text-xs">{course.level} • {course.duration}</div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{course.title}</h3>
          {course.category && <div className="text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded">{course.category}</div>}
        </div>
        <p className="mt-2 text-sm text-slate-600 line-clamp-3">{course.description}</p>
      </div>
    </Link>
  );
}
