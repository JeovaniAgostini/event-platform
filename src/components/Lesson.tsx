import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames'

interface LessonProps {
    title: string
    slug: string
    availableAt: Date
    type: 'live' | 'class'
}

export function Lesson(props: LessonProps) {
    const { slug } = useParams<{ slug: string }>()

    const isLessonAvailable = isPast(props.availableAt)
    const availableDateFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
        locale: ptBR
    })

    const isActiveLesson = slug === props.slug;

    return (
        <Link to={`/event/lesson/${props.slug}`} className="group">
            <span className="text-gray-300">
                {availableDateFormatted}
            </span>

            <div className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${isActiveLesson ? 'bg-green-500' : ''} ${!isLessonAvailable && isActiveLesson ? 'bg-red-500 group-hover:border-red-500' : ''}`}>
                <header className="flex items-center justify-between">

                    {isLessonAvailable ? (
                        <span className={classNames('text-sm text-blue-500 font-medium flex items-center gap-2', {
                            'text-white': isActiveLesson,
                        })}>
                            <CheckCircle size={20} />
                            Conteúdo liberado
                        </span>
                    ) : (
                        <span className={classNames('text-sm font-medium flex items-center gap-2', {
                            'text-gray-900': isActiveLesson,
                            'text-orange-500': !isActiveLesson
                        })}>
                            <Lock size={20} />
                            Em Breve
                        </span>
                    )}

                    {props.type === 'live' ? (
                        <span className={classNames('text-xs rounded px-2 py-[0.125rem] text-green-300 border border-green-300 font-bold', {
                            'text-green-500': isActiveLesson,
                            'bg-white': isActiveLesson,
                            'border-white': isActiveLesson,
                        })}>
                            AO VIVO
                        </span>
                    ) : (
                        <span className={classNames('text-xs rounded px-2 py-[0.125rem] text-white border border-green-300 font-bold', {
                            'text-white': isActiveLesson,
                            'border-white': isActiveLesson,
                        })}>
                            AULA PRÁTICA
                        </span>
                    )}

                </header>

                <strong className={classNames('mt-5 block', {
                    'text-white': isActiveLesson,
                    'text-gray-200': !isActiveLesson,
                })}>
                    {props.title}
                </strong>
            </div>
        </Link>
    )
}